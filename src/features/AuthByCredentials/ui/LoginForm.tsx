'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormInputs, SCH_Login } from '../model/schema';
import { encrypt } from '@/shared/lib/crypto';
import { setAuthTokenCookie } from '@/shared/lib/authCookies';
import { loginFormFields } from '../model/constant';
import InputField from '@/shared/ui/InputField';
import { useState } from 'react';
import Alert from '@/shared/ui/Alert';

const CE_LoginForm = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(SCH_Login),
    mode: 'all',
  });

  const onSubmit = (data: LoginFormInputs) => {
    setLoginError(null);

    if (data.username === 'amiardha' && data.password === 'password') {
      const dataUser = {
        username: 'amiardha',
        fullname: 'Amillio Ardha',
        role: 'Superuser',
        email: 'admin@example.com',
      };

      const encryptedData = encrypt(dataUser);

      setAuthTokenCookie(encryptedData);

      router.push('/');
    } else {
      setLoginError('Username atau password yang Anda masukkan salah.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {loginError && (
        <Alert
          variant="error"
          title="Login Gagal"
          className="mb-6"
          onClose={() => setLoginError(null)}
        >
          {loginError}
        </Alert>
      )}
      {loginFormFields.map((field) => (
        <InputField
          key={field.id}
          id={field.id}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          register={register(field.id)}
          error={errors[field.id]}
        />
      ))}
      <button
        type="submit"
        className="bg-primary-base w-full rounded-full !py-3 text-white"
      >
        Login
      </button>
    </form>
  );
};

export default CE_LoginForm;
