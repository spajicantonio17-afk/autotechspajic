// Server-only Google Calendar helper.
// Writes events into a shared workshop calendar via a Service Account.
// Setup: create a Service Account, enable Calendar API, and share the target
// calendar with the service account e-mail (permission "Make changes to events").
import { google } from "googleapis";

export const WORKSHOP_TIMEZONE = "Europe/Sarajevo"; // Grude, BiH

type CreateEventInput = {
  summary: string;
  description: string;
  // Naive local datetime strings, e.g. "2026-06-29T09:00:00" (no offset).
  // Anchored to WORKSHOP_TIMEZONE by the Calendar API below.
  start: string;
  end: string;
};

function getCalendarClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  // Private keys are stored single-line in env with escaped newlines.
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error(
      "Google Calendar nije konfiguriran (GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_PRIVATE_KEY).",
    );
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar.events"],
  });

  return google.calendar({ version: "v3", auth });
}

/**
 * Insert an event into the shared workshop calendar.
 * Returns the htmlLink to the created event.
 */
export async function createCalendarEvent({
  summary,
  description,
  start,
  end,
}: CreateEventInput): Promise<{ htmlLink: string }> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) {
    throw new Error("Google Calendar nije konfiguriran (GOOGLE_CALENDAR_ID).");
  }

  const calendar = getCalendarClient();

  const res = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary,
      description,
      start: { dateTime: start, timeZone: WORKSHOP_TIMEZONE },
      end: { dateTime: end, timeZone: WORKSHOP_TIMEZONE },
    },
  });

  return { htmlLink: res.data.htmlLink ?? "" };
}
