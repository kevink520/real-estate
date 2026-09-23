"use server";

export type Intent = "buying" | "selling" | "both";

export type ConsultationState = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: Partial<Record<"name" | "contact" | "intent", string>>;
  firstName?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function requestConsultation(
  _prev: ConsultationState,
  formData: FormData,
): Promise<ConsultationState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const intent = String(formData.get("intent") ?? "");
  const message = String(formData.get("message") ?? "").trim().slice(0, 2000);

  const errors: ConsultationState["errors"] = {};
  if (name.length < 2) errors.name = "Please share your name.";
  if (!email && !phone) errors.contact = "Add an email or phone number so I can reach you.";
  else if (email && !EMAIL.test(email)) errors.contact = "That email address doesn't look quite right.";
  if (!["buying", "selling", "both"].includes(intent)) errors.intent = "Let me know if you're buying, selling, or both.";

  if (Object.keys(errors).length) {
    return { status: "error", errors, message: "A few details are missing." };
  }

  // Demo site: no CRM is connected. A real deployment would forward this to one.
  console.info("[consultation]", { name, email, phone, intent, message });
  await new Promise((r) => setTimeout(r, 700));

  return { status: "success", firstName: name.split(/\s+/)[0] };
}
