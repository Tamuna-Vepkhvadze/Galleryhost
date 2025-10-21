import DynamicForm from "../../../component/DynamicForm/DynamicForm";
import { loginSchema } from "../../../Zod/loginSchema";

const Login = () => {
  return (
    <DynamicForm
      title="Login"
      initialData={{ email: "", password: "" }}
      validationSchema={loginSchema}
      apiEndpoint="http://51.20.54.135:5000/api/auth/login"
      successRedirect="/"
      fields={[
        { name: "email", type: "email", placeholder: "Email" },
        { name: "password", type: "password", placeholder: "Password", showToggle: true },
      ]}
      errorMapping={() => ({
        email: "Email ან პაროლი არასწორია",
        password: "Email ან პაროლი არასწორია",
      })}
    />
  );
};
export default Login;
