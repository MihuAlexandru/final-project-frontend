import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

export default function SignUpForm() {
  return (
    <form>
      <label>
        Surname:
        <Input />
      </label>
      <label>
        Name:
        <Input />
      </label>
      <label>
        Telephone number:
        <Input />
      </label>
      <label>
        E-mail:
        <Input />
      </label>
      <label>
        Password:
        <Input />
      </label>
      <label>
        Confirm Password:
        <Input />
      </label>
      <Button>Register</Button>
    </form>
  );
}
