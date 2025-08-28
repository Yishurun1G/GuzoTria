
import mockScooters from "../api/MookScooter"
import ScooterCard from "./ScooterCard";

function ScooterList() {
  return (
    <div className=" w-4/5 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-40">
      {mockScooters.map(scooter => (
        <ScooterCard key={scooter.id} scooter={scooter} userLoggedIn={false} />
      ))}
    </div>
  );
}

export default ScooterList;
