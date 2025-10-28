import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

import BookingTable from "../BookingTable/BookingTable";
import Swal from "sweetalert2";
import axios from "axios";

const Booking = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const url = `https://car-doctor-server-bilh9akv6-shahidul-islams-projects-17957188.vercel.app/bookings?email=${user?.email}`;

  useEffect(() => {
    axios.get(url, { withCredentials: true }).then((res) => {
      setBookings(res.data);
    });
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setBookings(data);
    //     console.log(data);
    //   });
  }, [url]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://car-doctor-server-bilh9akv6-shahidul-islams-projects-17957188.vercel.app/bookings/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Coffee has been deleted.",
                icon: "success",
              });
              const remaining = bookings.filter((item) => item._id !== id);
              setBookings(remaining);
            }
          });
      }
    });
  };

  const handleBookingConfirm = (id) => {
    fetch(
      `https://car-doctor-server-bilh9akv6-shahidul-islams-projects-17957188.vercel.app/bookings/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "confirm" }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          // update status
          const remaining = bookings.filter((item) => item._id !== id);
          const updated = bookings.find((item) => item._id === id);
          updated.status = "confirm";
          const newBooking = [updated, ...remaining];
          setBookings(newBooking);
        }
      });
  };
  return (
    <div className="py-20 bg-nu10">
      <div className="container-2">
        <p>Booking: {bookings.length}</p>
        <div className="">
          <table className="table w-full">
            <tbody className="">
              {bookings.map((item) => (
                <BookingTable
                  key={item._id}
                  bookingTable={item}
                  handleDelete={handleDelete}
                  handleBookingConfirm={handleBookingConfirm}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Booking;
