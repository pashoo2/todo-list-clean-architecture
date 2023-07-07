type HashedPassword = string;

export interface PasswordHashCompareMethodParameters {
  password: string;
  hash: HashedPassword;
}

export interface PasswordHash {
  calculate(password: string): Promise<HashedPassword>;
  compare(parameters: PasswordHashCompareMethodParameters): Promise<boolean>;
}
