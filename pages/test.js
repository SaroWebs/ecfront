import axios from 'axios';
import { getAppCookies } from '@/lib/utils';

const test = (props) => {


  console.log(props);
  const getTestData = () => {
    axios
      .get("http://localhost:8000/api/test")
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className='min-h-screen'>
      <h1>Test</h1>
      <button onClick={getTestData}>Click</button>
    </div>
  )
}

export default test

export async function getServerSideProps(context) {
  const KEY = process.env.JWT_KEY;
  const { req } = context;
  const { token } = getAppCookies(req);
  const signedUser = token ? verifyToken(token) : '';

  return {
    props: {
      signedUser,
      KEY
    },
  }
}