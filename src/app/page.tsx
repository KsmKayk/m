"use client";

import { useEffect, useState } from "react";
import { differenceInMilliseconds, differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, differenceInMonths, differenceInYears } from "date-fns";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

// 📅 Data em que vocês se conheceram
const START_DATE = new Date("2017-07-29T00:00:00");

export default function Page() {
  const [timeTogether, setTimeTogether] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    ms: 0,
  });

  // 🕒 Atualiza o contador em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const years = differenceInYears(now, START_DATE);
      const months = differenceInMonths(now, START_DATE) % 12;
      const days = differenceInDays(now, new Date(START_DATE.getFullYear() + years, START_DATE.getMonth() + months, START_DATE.getDate()));
      const hours = differenceInHours(now, new Date(now.getFullYear(), now.getMonth(), now.getDate()));
      const minutes = differenceInMinutes(now, new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()));
      const seconds = differenceInSeconds(now, new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()));
      const ms = differenceInMilliseconds(now, new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()));

      setTimeTogether({ years, months, days, hours, minutes, seconds, ms });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center text-center min-h-screen w-full bg-black text-white overflow-x-hidden">
      {/* Título romântico */}
      <motion.h1
        className="text-3xl md:text-5xl font-light mt-10 mb-10 px-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        “Desde o dia que te conheci, o céu ficou mais bonito.”
      </motion.h1>

      {/* Carrossel de imagens */}
      <motion.div
        className="w-full max-w-md mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          spaceBetween={30}
          className="rounded-2xl overflow-hidden"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
            <SwiperSlide key={i}>
              <img
                src={`/images/${i}.jpg`}
                alt={`Foto ${i}`}
                className="w-full h-[400px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Contador */}
      <motion.div
        className="text-lg mb-16 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <p className="font-light">
          Estamos juntos há
        </p>
        <p className="text-xl md:text-2xl font-medium mt-2">
          {timeTogether.years} anos, {timeTogether.months} meses, {timeTogether.days} dias,{" "}
          {timeTogether.hours} horas, {timeTogether.minutes} minutos, {timeTogether.seconds} segundos{" "}
          💫
        </p>
      </motion.div>

      {/* Constelação (placeholder simples com estrelas animadas) */}
      <motion.div
        className="relative w-full max-w-lg h-64 mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
      >
        <StarField />
      </motion.div>

      {/* Declaração */}
      <motion.div
        className="max-w-lg px-6 mb-32"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <p className="text-xl font-light leading-relaxed">
          Desde que você entrou na minha vida, tudo mudou.
          Nunca pensei que alguém pudesse me completar tão bem.
          Meu mundo é outro com você e eu não tenho mais como imaginar ele sem você.
          O que desejo dizer é que eu te amo mais do que tudo. ❤️
        </p>
      </motion.div>

      {/* Declaração */}
      <motion.div
        className="max-w-lg px-6 mb-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <p className="text-xl font-light leading-relaxed">
          ❤️<br/>
          Você quer....
        </p>
      </motion.div>

      {/* Imagem final (foto do pedido) */}
      <motion.div
        className="w-full max-w-md mb-24"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <img
          src="/images/proposal.jpg"
          alt="Nosso momento"
          className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
        />
      </motion.div>
    </main>
  );
}

// 🌌 Componente simples para efeito de constelação
function StarField() {
  const stars = Array.from({ length: 60 });

  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      {stars.map((_, i) => {
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 4 + 2;
        const delay = Math.random() * 5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
            }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
