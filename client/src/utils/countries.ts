import countries from "world-countries";
import { PhoneNumberUtil } from "google-libphonenumber";
export const formattedCountries =
  //map return an array  it contain of objects each is code,name,flag,location,region
  //when writing ## =>({})## its mean we return object contain properties code name flag location region
  countries.map((item) => ({
    code: item.cca2,
    name: item.name.common,
    flag: item.flag,
    region: item.region,
    phoneCode: item.idd.root + item.idd.suffixes?.[0] || "",
  }));
export const findCountryByCode = (name: string) =>
  formattedCountries.find((item) => item.name === name);

const phoneUtil = PhoneNumberUtil.getInstance();
export function validatePhone(phone: string, countryCode: string) {
  try {
    const parsed = phoneUtil.parse(phone, countryCode);
    return phoneUtil.isValidNumberForRegion(parsed, countryCode);
  } catch (e) {
    console.warn("Phone parsing failed:", e);
    return false;
  }
}
