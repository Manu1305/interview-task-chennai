import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate,Link} from 'react-router-dom'
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState("");
  const [file, setFile] = useState();
  const [emailverified, setEmailverified] = useState(false);
  const [phoneverified, setPhoneverified] = useState(false);
  const [emailotp, setemailOtp] = useState();
  const [mobotp, setmobotp] = useState();
  const [emailapproved, setEmailapproved] = useState(false);
  const [phoneapproved, setPhoneapproved] = useState(false);
  const navigate = useNavigate();
  const signUp = async () => {
    if (emailapproved && phoneapproved) {
      const Type='user'
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("image", file);
      formData.append("Type", Type);

      const response = await axios.post(
        "http://localhost:8000/user/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response,'response');
      
      console.log(response.data,'data');
      
      console.log(response.status,'status');
      alert("success created");
      navigate("/");
    } else {
      toast.error("Please validate email and phone", {
        position: "top-center",
      });
    }
  };

  function sendemailOtp() {
    toast("Wow so easy!");
    try {
      axios
        .post("http://localhost:8000/user/emailotp", {
          email,
        })
        .then((res) => {
          alert("email sent successfully");
          console.log(res);
          setEmailverified(true);
          setEmailapproved(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error, "error");
    }
  }

  const sendmobOtp = async () => {
    try {
      await axios
        .post("http://localhost:8000/user/sendmobotp", { phone })
        .then((res) => {
          console.log(res);
          toast("correct ");
          setPhoneverified(true);
          setPhoneapproved(true);
        })
        .catch((error) => {
          toast("wrong number format", {
            position: "top-center",
          });
          console.log(error, "insidethen");
        });
    } catch (error) {
      toast("wrong nubmer");
      console.log(error, "errorrrrrrphone");
    }
  };

  const verifyEMailOtp = () => {
    try {
      axios
        .post("http://localhost:8000/user/verifyemailotp", {
          emailotp,
        })
        .then((res) => {
          console.log(res);
          alert("verified");
          setEmailverified(false);
        })
        .catch((err) => {
          console.log(err, "emailotp error:");
        });
    } catch (error) {
      console.log(error, "error emil otp");
    }
  };
  const verifyMobileOtp = () => {
    try {
      axios
        .post("http://localhost:8000/user/verifymobileotp", {
          mobotp,
        })
        .then((res) => {
          console.log(res);
          alert("verified");
          setEmailverified(false);
          setPhoneverified(false);
        })
        .catch((err) => {
          console.log(err, "emailotp error:");
        });
    } catch (error) {
      console.log(error, "error emil otp");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Signup
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your Name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Manu krishnan"
                  required=""
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <div className="flex">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <button
                    className="text-white font-mono font-bold ml-2"
                    onClick={() => {
                      sendemailOtp();
                    }}
                  >
                    send otp
                  </button>
                </div>

                <div className="mt-10">
                  <input
                    name="otp"
                    onChange={(e) => {
                      setemailOtp(e.target.value);
                    }}
                    placeholder="otp"
                  />
                  <button
                    className="text-white font-mono font-bold"
                    onClick={() => {
                      verifyEMailOtp();
                    }}
                  >
                    verify{" "}
                  </button>
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Phone
                </label>
                <div className="flex">
                  <input
                    type="number"
                    name="number"
                    id="number"
                    placeholder="12345...."
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                  <button
                    className="font-mono text-white font-bold ml-2"
                    onClick={() => {
                      sendmobOtp();
                    }}
                  >
                    {" "}
                    sendotp{" "}
                  </button>
                </div>

                <div>
                  <input
                    name="otp"
                    onChange={(e) => {
                      setmobotp(e.target.value);
                    }}
                    placeholder="mobotp"
                  />
                  <button
                    onClick={() => {
                      verifyMobileOtp();
                    }}
                  >
                    {" "}
                    verify
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Upload file
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </div>

              <button
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={() => {
                  signUp();
                }}
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                 to='/'
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
