import ServiceCard from "./ServiceCard";
import useService from "../../hooks/useService";

const OurService = ({ service, ourServiceArea, description }) => {
  // const [serviceCard, setServiceCard] = useState([]);

  // useEffect(() => {
  //   fetch("https://car-doctor-server-bilh9akv6-shahidul-islams-projects-17957188.vercel.app/services")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setServiceCard(data);
  //     });
  // }, []);
  const serviceCard = useService();
  return (
    <>
      <div className="2xl:py-[130px] xl:py-[110px] lg:py-[90px] md:py-[80px] sm:py-[70px] py-[60px] bg-nu10">
        <div className="container-2">
          <div className="mb-14">
            <div className="text-center">
              <h5 className="text-primary font-bold mb-5">{service}</h5>
              <h1 className="text-nu20 font-bold mb-5">{ourServiceArea}</h1>
              <p className="text-nu40">{description}</p>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6 mb-12">
            {serviceCard.map((item) => (
              <div key={item._id} className="col-span-4">
                <ServiceCard services={item} />
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="px-4 py-2 border-2 border-primary rounded-md text-primary font-semibold">
              More Services
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurService;
