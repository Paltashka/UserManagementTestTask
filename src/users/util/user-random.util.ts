export class UserRandomUtil {
  private static readonly FIRST_NAMES = ['Bob', 'Michael', 'Peter'];
  private static readonly LAST_NAMES = ['Kolmeroe', 'Brown', 'Smith'];

  private static readonly EMAIL_DOMAINS = [
    'example.com',
    'mail.com',
    'test.org',
    'fans-crm.com',
  ];

  static normalizeLower(v: string) {
    return v.trim().toLowerCase();
  }

  static normalizePhone(v: string): string {
    return v.replace(/[^\d]/g, '');
  }

  static randomName(): string {
    const first =
      this.FIRST_NAMES[Math.floor(Math.random() * this.FIRST_NAMES.length)];
    const last =
      this.LAST_NAMES[Math.floor(Math.random() * this.LAST_NAMES.length)];

    return `${first} ${last}`;
  }

  static randomEmail(name: string): string {
    const base = name.toLowerCase().replace(/\s+/g, '.');
    const domain =
      this.EMAIL_DOMAINS[Math.floor(Math.random() * this.EMAIL_DOMAINS.length)];

    return `${base}.${Math.floor(Math.random() * 1e7)}@${domain}`;
  }

  static randomPhone(): string {
    const n = () => Math.floor(Math.random() * 10);
    return `+380${n()}${n()}${n()}${n()}${n()}${n()}${n()}${n()}${n()}`;
  }

  static randomBirthDate(): Date {
    const start = new Date(1960, 0, 1).getTime();
    const end = new Date(2006, 11, 31).getTime();
    return new Date(start + Math.floor(Math.random() * (end - start)));
  }
}
