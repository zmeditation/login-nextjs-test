import { BaseAuthLayout } from "../components/Auth/Base";
import { LoginForm } from "../components/Auth/Login";

const Homepage = () => {
  return (
    <BaseAuthLayout>
      <LoginForm />
    </BaseAuthLayout>
  );
};
export default Homepage;
