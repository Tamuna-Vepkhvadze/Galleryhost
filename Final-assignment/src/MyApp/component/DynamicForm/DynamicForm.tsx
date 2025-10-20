import { useState, type FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import userState from "../../../zustand/userState";
import { toast } from "react-toastify";

type FieldConfig = {
  name: string;
  type?: string;
  placeholder?: string;
  showToggle?: boolean;
};

type DynamicFormProps<T> = {
  title: string;
  initialData: T;
  validationSchema: any; 
  apiEndpoint: string;
  successRedirect: string;
  fields: FieldConfig[];
  errorMapping?: (error: AxiosError) => Record<string, string>; 
};

function DynamicForm<T>({ title, initialData, validationSchema, apiEndpoint, successRedirect, fields, errorMapping }: DynamicFormProps<T>) {
  const { setUser } = userState();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPasswordFields, setShowPasswordFields] = useState<Record<string, boolean>>({});

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleShow = (fieldName: string) => {
    setShowPasswordFields((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = validationSchema.safeParse(formData);
    if (!result.success) {
      const formErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const fieldName = issue.path[0] as string;
        formErrors[fieldName] = issue.message;
      }
      setErrors(formErrors);
      return;
    }
    try {
      const res = await axios.post(apiEndpoint, formData);
      setUser(res.data.user, res.data.token);
      navigate(successRedirect);
      toast.success("Success!");
    } catch (err) {
      const error = err as AxiosError;
      if (errorMapping) {
        setErrors(errorMapping(error));
      } else {
      
        setErrors(
          fields.reduce((acc, field) => {
            acc[field.name] = `${title} დროს დაფიქსირდა შეცდომა`;
            return acc;
          }, {} as Record<string, string>)
        );
      }
      console.error(error.response?.data);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">{title}</h2>
      {fields.map(({ name, type = "text", placeholder, showToggle }) => (
        <div key={name} className="relative">
          <input
            name={name}
            type={showToggle ? (showPasswordFields[name] ? "text" : "password") : type}
            placeholder={placeholder}
            value={(formData as any)[name]}
            onChange={onChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors[name] ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"
            }`}
          />
          {showToggle && (
            <button
              type="button"
              onClick={() => toggleShow(name)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:underline"
            >
              {showPasswordFields[name] ? "Hide" : "Show"}
            </button>
          )}
          {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
        </div>
      ))}
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
      >
        {title}
      </button>
    </form>
  );
}

export default DynamicForm;
