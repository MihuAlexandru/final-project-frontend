import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

export default function SignUpForm() {
  return (
    <form>
        <Input label="Surname:" />
        <Input label="Name:"/>
        <Input label="Telephone number:"/>     
        <Input label="E-mail:"/>
        <Input label="Password:"/>
        <Input label="Confirm Password:"/>
      <Button>Register</Button>
    </form>
  );
}
