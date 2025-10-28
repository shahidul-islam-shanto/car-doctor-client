import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import BredCrumb from "../../Components/BredCrumb/BredCrumb";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Checkout = () => {
  const service = useLoaderData();
  const { title, price, service_id, img } = service;
  const { user } = useContext(AuthContext);
  console.log("img:", img);

  const handleCheckOut = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const email = user?.email;
    const date = form.date.value;

    const booking = {
      customerName: name,
      phone: phone,
      email: email,
      service: service_id,
      price: price,
      date: date,
      title: title,
      img: img,
    };
    console.log(booking);

    fetch(
      "https://car-doctor-server-bilh9akv6-shahidul-islams-projects-17957188.vercel.app/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Successfully Booking!",
            icon: "success",
            draggable: true,
          });
        }
      });
  };

  return (
    <div>
      <BredCrumb />
      <div className="bg-nu10 2xl:py-[120px] xl:py-[100px] lg:py-[80px] md:py-[70px] sm:py-[60px] py-[50px]">
        <div className="container-2">
          <div className="">
            <form
              onSubmit={handleCheckOut}
              className="px-14 py-14 bg-nu60 rounded-xl"
            >
              <div className="grid grid-cols-12 gap-6 mb-6">
                <div className="col-span-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Your Name..."
                    className="placeholder:text-nu102 text-nu20 bg-nu10 w-full px-4 py-3 rounded-lg "
                  />
                </div>
                <div className="col-span-6">
                  <input
                    type="email"
                    defaultValue={user?.email}
                    placeholder="Enter Your Email..."
                    className="placeholder:text-nu102 text-nu20 bg-nu10 w-full px-4 py-3 rounded-lg "
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-6 mb-6">
                <div className="col-span-6">
                  <input
                    type="number"
                    name="phone"
                    placeholder="Your Phone"
                    className="placeholder:text-nu102 text-nu20 bg-nu10 w-full px-4 py-3 rounded-lg "
                  />
                </div>
                <div className="col-span-6">
                  <input
                    type="text"
                    defaultValue={price}
                    placeholder="Your Email"
                    className="placeholder:text-nu102 text-nu20 bg-nu10 w-full px-4 py-3 rounded-lg "
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-6 mb-6">
                <div className="col-span-6">
                  <input
                    type="date"
                    name="date"
                    className="w-full placeholder:text-nu102 text-nu20 bg-nu10 px-4 py-3 rounded-lg"
                  />
                </div>
                <div className="col-span-6">
                  <input
                    type="text"
                    defaultValue={title}
                    placeholder="Your Email"
                    className="placeholder:text-nu102 text-nu20 bg-nu10 w-full px-4 py-3 rounded-lg "
                  />
                </div>
              </div>
              <div className="mb-6">
                <textarea
                  type="text"
                  rows="6"
                  name="message"
                  placeholder="Your Message..."
                  className="w-full px-4 py-3 bg-nu10 rounded-lg "
                />
              </div>
              <div className="px-6 py-4 bg-primary text-center rounded-lg">
                <button className="text-nu10 font-bold text-[20px]">
                  Order Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
