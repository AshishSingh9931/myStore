import React from "react";
import { Link } from "react-router-dom";

import programmingImg from "../assets/programming.jpg";
import novelsImg from "../assets/novel.avif";
import academicImg from "../assets/accedmic.avif";

export default function Home() {
  const categories = [
    { id: "programming", name: "Programming Books", image: programmingImg },
    { id: "novels", name: "Novels", image: novelsImg },
    { id: "academic", name: "Academic Books", image: academicImg },
  ];

  return (
    <div className="space-y-20">
      <section className="bg-[linear-gradient(to_right,#4f46e5,#2563eb)] text-white rounded-2xl p-12 shadow-xl text-center">
        <h1 className="text-4xl font-extrabold mb-4 tracking-wide">
          Welcome to <span className="text-yellow-300">MyStore</span>
        </h1>

        <p className="text-lg leading-relaxed max-w-2xl mx-auto">
          Discover a curated collection of books crafted to enhance learning,
          spark creativity, and support your growth journey — whether you’re
          exploring programming, novels, or academic titles.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Why Choose Our Books?
        </h2>

        <p className="text-gray-700 text-lg leading-relaxed">
          Reading is more than a habit — it's a powerful tool for growth. At{" "}
          <span className="font-semibold">MyStore</span>, we bring you carefully
          curated titles that offer clarity, depth, and real-world value.
          Whether you're upgrading your skills, exploring stories, or preparing
          for academics, our books are selected to help you learn better and
          grow faster.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Explore Categories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="group block bg-white rounded-2xl shadow-lg overflow-hidden 
                         border border-gray-200 hover:-translate-y-2 hover:shadow-2xl transition"
            >
              <img
                src={cat.image}
                className="w-full h-60 object-cover group-hover:scale-110 transition"
              />

              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-indigo-600">
                  {cat.name}
                </h3>
                <p className="text-gray-600 mt-3">
                  Premium selection of {cat.name}.
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
