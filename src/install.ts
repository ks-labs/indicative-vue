import { sanitizer, validator } from "indicative";

declare interface ValidationClass {
  rules: any;
  messages: any;
  sanitizationRules: any;
}

const sani: any = sanitizer.extend;

export default {
  install: (Vue: any, options: Record<any, any>) => {
    for (const item in options?.validations ?? {}) {
      sani(item, options.validations[item]);
    }
    for (const item in options?.sanitizor ?? {}) {
      sani[item] = options.sanitizor[item];
    }

    Vue.prototype.$indicative = async (data: object, validationClass: any) => {
      try {
        await validator.validateAll(
          data,
          validationClass.rules,
          validationClass.messages,
          validationClass.sanitizationRules
        );
        return { valid: true };
      } catch (err) {
        if (options?.return_error) {
          return { valid: false, errors: err };
        } else {
          for (const item of err) {
            const element = document.getElementById(item.field);
            if (!element) continue;

            const elementMessage = document.getElementById(
              `${item.field}_message`
            ) as any;
            element.classList.add("is-invalid");
            elementMessage.innerHTML = item.message;
          }
          return { valid: false };
        }
      }
    };
  },
};
