import Signup from "../../components/Auth/Signup/Signup";
import { redirect } from "next/navigation";
function SignupPage() {
 async function createUser(data: any) {
  'use server';
  console.log('data', data)
  const response = await fetch('http://localhost:3005/auth/signup', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify(data),
  });

  if (!response.ok) {
   throw new Error('Signup failed');
  }
  const responseData = await response.json();
  return responseData;
 }
 return <Signup createUser={createUser} />
}

export default SignupPage;