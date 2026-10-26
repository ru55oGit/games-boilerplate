// Módulo de analytics compartido — la misma fuente se copia a mano en cada
// repo del hub (mismo criterio que boludeando-ads/sdk/boludeando-ads-client,
// ver comentarios "Copiado de..." en src/ads/), cambiando solo GAME_NAME y
// la lista de ALLOWED_EVENTS según lo que ese proyecto realmente mide.
//
// GAME_NAME acá es "boludeando_hub" porque este repo (pese al nombre
// "games-boilerplate") es el portal boludeando.com, no un juego individual.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const GAME_NAME = "boludeando_hub";
const INTERNAL_TRAFFIC_KEY = "ga_internal_traffic";

// Eventos que este proyecto puede emitir. Mantenerla angosta a propósito:
// evita escribir nombres de evento a mano (y typearlos mal) en cada call site.
export type AnalyticsEvent = "select_game" | "share";

type EventParams = Record<string, string | number | boolean | undefined>;

function isLocalhost(): boolean {
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1";
}

function isDebugMode(): boolean {
  if (import.meta.env.DEV) return true;
  try {
    return new URLSearchParams(window.location.search).get("debug_ga") === "1";
  } catch {
    return false;
  }
}

function isInternalTraffic(): boolean {
  try {
    return localStorage.getItem(INTERNAL_TRAFFIC_KEY) === "1";
  } catch {
    return false;
  }
}

// ?internal=1 marca este dispositivo como tráfico interno de por vida (hasta
// que se visite con ?internal=0); así no hace falta repetir el parámetro en
// cada link de prueba que se comparte para probar el hub.
function syncInternalTrafficFlag(): void {
  try {
    const internal = new URLSearchParams(window.location.search).get("internal");
    if (internal === "1") localStorage.setItem(INTERNAL_TRAFFIC_KEY, "1");
    else if (internal === "0") localStorage.removeItem(INTERNAL_TRAFFIC_KEY);
  } catch {
    // localStorage no disponible (modo privado, etc.) — seguimos sin marcar nada.
  }
}

// Llamar una sola vez al boot de la app (ver main.tsx), antes del primer
// track(), para que el flag de tráfico interno quede seteado en gtag desde
// el arranque.
export function initAnalytics(): void {
  syncInternalTrafficFlag();
  if (isLocalhost() || typeof window.gtag !== "function") return;
  if (isInternalTraffic()) {
    // gtag('set', ...) aplica el parámetro a todos los hits siguientes de
    // esta sesión sin necesitar el Measurement ID acá (vive hardcodeado en
    // el script inline de cada index.html, no en este módulo compartido).
    window.gtag("set", { traffic_type: "internal" });
  }
}

export function track(eventName: AnalyticsEvent, params: EventParams = {}): void {
  if (isLocalhost()) {
    if (isDebugMode()) console.log("[GA debug] (localhost, no se envía)", eventName, params);
    return;
  }

  const payload: EventParams = { ...params, game_name: GAME_NAME };
  if (isInternalTraffic()) payload.traffic_type = "internal";
  if (isDebugMode()) payload.debug_mode = true;
  // sendBeacon en vez de un fetch/XHR normal: varios de estos eventos
  // (select_game acá, share/cross_game en los juegos) se disparan en el
  // mismo click que dispara una navegación a otro dominio — sin esto, el
  // browser puede cortar el request a medio mandar al abandonar la página,
  // y el evento nunca llega a GA4.
  payload.transport_type = "beacon";

  try {
    window.gtag?.("event", eventName, payload);
  } catch {
    // El tracking nunca debe romper la app.
  }

  if (isDebugMode()) console.log("[GA]", eventName, payload);
}
