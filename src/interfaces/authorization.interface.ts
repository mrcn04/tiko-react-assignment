/* eslint-disable no-unused-vars */
export default interface IAuthorization {
  error: string;
  handleSubmit: (e: any) => void;
  emailRef: React.Ref<HTMLInputElement>;
  passwordRef: React.Ref<HTMLInputElement>;
  loading: boolean;
  name: string;
}
