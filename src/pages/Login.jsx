import Button from "../components/UI/Button/Button";
import Card from "../components/UI/Card/Card";
import Input from "../components/UI/Input/Input";
import SearchBar from "../components/UI/SearchBar/SearchBar";

export default function Login() {
  return (
    <>
      <h1>Login Page</h1>
      <SearchBar />
      <Button>Hi</Button>
      <Input label="nume" />
      <Card>Hi</Card>
    </>
  );
}
