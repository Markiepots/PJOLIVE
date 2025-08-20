import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const cars = [
    { name: "2025 Toyota Vios XLE A/T", img: "/cars/vios.jpg", price: 670000 },
    { name: "2019 Nissan Nv350 Urvan Premium A/T", img: "/cars/premium.jpg", price: 1050000 },
    { name: "2018 Ford Ranger Wildtrak 4x4 A/T", img: "/cars/wildtrak.jpg", price: 840000 },
    { name: "2015 Ford Focus", img: "/cars/focus.jpg", price: 480000 },
    { name: "2014 Mazda3", img: "/cars/mazda3.jpg", price: 470000 },
    { name: "2019 Ford Escape", img: "/cars/escape.jpg", price: 800000 },
    { name: "2018 Honda CR-V", img: "/cars/crv.jpg", price: 900000 },
    { name: "2016 Nissan Altima", img: "/cars/altima.jpg", price: 520000 },
    { name: "2020 Kia Sportage", img: "/cars/sportage.jpg", price: 950000 },
    { name: "2017 Subaru Forester", img: "/cars/forester.jpg", price: 870000 },
    { name: "Toyota HiAce Van", img: "/cars/hiace.jpg", price: 1050000 },
    { name: "Nissan NV350", img: "/cars/nv350.jpg", price: 980000 },
  ];

  const [price, setPrice] = useState(0);
  const [term, setTerm] = useState(48);

  // Scroll to calculator and set price
  const selectForCalculator = (carPrice) => {
    setPrice(carPrice);
    setTimeout(() => {
      const calculatorSection = document.getElementById("calculator");
      calculatorSection?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Correct Downpayment calculation
  const calculateDownPayment = () => {
  if (price <= 0) return "0.00";

  // Step 1: Original Price + 15% = Appraisal / New SRP
  const newSRP = price * 1.15;

  // Step 2: Finance Amount = 70% of Appraisal
  const financeAmount = newSRP * 0.7;

  // Step 3: Base Downpayment = Original Price − Finance Amount
  const baseDownPayment = price - financeAmount;

  // Step 4: Fixed Fees
  const transferFee = 15000;
  const insuranceFee = 20000;

  // Step 5: Chattel Fee based on Original Price
  let chattelFee = 0;
  if (price <= 500000) chattelFee = 28000;
  else if (price <= 999999) chattelFee = 29000;
  else if (price <= 1499999) chattelFee = 32000;
  else chattelFee = 34000;

  // Step 6: Total Downpayment
  const totalDownPayment = baseDownPayment + transferFee + insuranceFee + chattelFee;

  return totalDownPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};


  // Monthly amortization calculation
  const calculatePayment = () => {
    if (price <= 0) return "0.00";

    const newSRP = price * 1.15;
    const financeAmount = newSRP * 0.7;

    let termRate = 0;
    if (term === 24) termRate = 1.3395;
    else if (term === 36) termRate = 1.4493;
    else if (term === 48) termRate = 1.5729;

    const monthly = (financeAmount * termRate) / term;

    return monthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-yellow-500 to-orange-400 text-white relative">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <Image
          src="/hero-family-car.png"
          alt="Happy Family in Car"
          width={500}
          height={400}
          className="rounded-2xl shadow-xl mb-6"
        />
        <h1 className="text-5xl font-bold drop-shadow-lg">ZTS OL CARS</h1>
        <p className="mt-4 text-lg max-w-xl drop-shadow-md">
          Drive your dream car today with easy financing options!
        </p>
        <Button
          className="mt-6 px-6 py-3 text-lg bg-orange-500 hover:bg-orange-600 rounded-2xl shadow-xl"
          onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
        >
          Calculate My Payment
        </Button>
      </section>

      {/* Inventory */}
      <section className="px-6 py-12">
        <h2 className="text-3xl font-semibold text-center mb-10 drop-shadow-lg">Our Inventory</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cars.map((car, index) => (
            <Card key={index} className="bg-white text-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition">
              <CardContent className="p-4 flex flex-col items-center">
                <Image src={car.img} alt={car.name} width={250} height={160} className="rounded-lg mb-4" />
                <h3 className="text-lg font-bold mb-2 text-center">{car.name}</h3>
                <p className="mb-3 font-semibold text-pink-600 text-center">₱{car.price.toLocaleString()}</p>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl mb-2"
                  onClick={() => selectForCalculator(car.price)}
                >
                  Select for Calculator
                </Button>
                <Button
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-xl mt-2"
                  onClick={() =>
                    window.open(`https://m.me/104204169192425?ref=${encodeURIComponent("I want to reserve the unit")}`, "_blank")
                  }
                >
                  Reserve Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Financing Calculator */}
      <section id="calculator" className="px-6 py-12 bg-white text-gray-900">
        <h2 className="text-3xl font-semibold text-center mb-6 drop-shadow-md">Financing Calculator</h2>
        <div className="max-w-xl mx-auto bg-gray-50 p-6 rounded-2xl shadow-xl">
          {[
            { label: "Car Price (₱)", state: price, setter: setPrice },
            { label: "Estimated Downpayment", state: calculateDownPayment(), setter: null },
          ].map(({ label, state, setter }, i) => (
            <label key={i} className="block mb-4">
              {label}
              <input
                type="text"
                value={state || ""}
                onChange={setter ? (e) => setter(e.target.value ? Number(e.target.value) : 0) : null}
                disabled={!setter}
                className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-shadow shadow-sm hover:shadow-md bg-gray-100 text-gray-700"
                placeholder="Enter value"
              />
            </label>
          ))}

          {/* Loan Term Dropdown */}
          <label className="block mb-4">
            Loan Term (months)
            <select
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-gray-100 text-gray-700 shadow-sm hover:shadow-md transition"
            >
              <option value={24}>24 months</option>
              <option value={36}>36 months</option>
              <option value={48}>48 months</option>
            </select>
          </label>

          <p className="mt-4 text-center text-gray-800 text-lg">
            Monthly Amortization:{" "}
            <span className="font-bold text-xl text-blue-600">₱{calculatePayment()}</span>
          </p>
          <p className="mt-2 text-center text-sm text-red-600">
      NOTE: This is Estimated and Subject for approval,Included CMF, Transfer of OR'CR & 1st payment of insurance with 4 months to pay, Simply click reserved button for faster & better assistance, don’t worry, the reserved button is just for your reference only and the decision is still up to you .
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 py-12 text-center bg-gray-900 text-white">
        <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
        <p className="mb-2">📞 09947235279</p>
        <p className="mb-4">📞 09267864313</p>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl"
          onClick={() => window.open("https://www.facebook.com/Olive.Car", "_blank")}
        >
          Visit our Facebook Page
        </Button>
      </section>

      {/* Floating Messenger Button */}
      <a
        href="https://m.me/104204169192425"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-xl flex items-center space-x-2"
      >
        <Image src="/messenger.png" alt="Messenger" width={24} height={24} />
        <span>Chat</span>
      </a>
    </div>
  );
}
