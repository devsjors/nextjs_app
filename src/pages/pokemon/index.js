import { motion } from "framer-motion";
import fetch from "isomorphic-fetch";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import FadeIntoView from "../../components/fadeIntoView";

export default function Index(data) {
  const { pokemons: defaultPokemon, next } = data;
  const [pokemon, updatePokemon] = useState(defaultPokemon);
  const [page, updatePage] = useState({
    next,
    current: defaultEndpoint
  });
  const { current } = page;

  useEffect(() => {
    if (current === defaultEndpoint) return;
    async function request() {
      setFetching(true);
      const response = await fetch(current);
      const nextData = await response.json();
      const pokemons = await Promise.all(
        nextData.results.map(async result => {
          const pokemonResponse = await fetch(result.url);
          return await pokemonResponse.json();
        })
      );
      const { next } = await nextData;
      await updatePage({ current, next });
      await updatePokemon(prev => [...prev, ...pokemons]);
      setFetching(false);
    }
    request();
  }, [current]);

  const [fetching, setFetching] = useState(false);
  const { ref, inView } = useInView({ threshold: 1 });
  useEffect(() => {
    handleLoadMore();
    console.log(pokemon.length);
  }, [inView]);

  function handleLoadMore() {
    updatePage(prev => {
      return {
        ...prev,
        current: page.next
      };
    });
  }

  return (
    <motion.main initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <p className="fixed bottom-0 right-0 px-2 py-2 bg-red-300 rounded-md">
        {fetching ? "currently fetching" : "done fetching"}
      </p>
      <section className="container py-20">
        <motion.ul className="grid grid-cols-1 gap-6 pb-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {pokemon.map(pokemon => {
            const { id, name, sprites, types } = pokemon;
            const mainType = types[0].type.name;
            return (
              <FadeIntoView key={id}>
                <Link href={`/pokemon/${name}`}>
                  <motion.li
                    className={`bg-opacity-60 transition-colors duration-1000 py-12 ease-out rounded-md shadow-md cursor-pointer ${`bg-types-${mainType}`}`}
                  >
                    <div className="relative flex items-center justify-center w-full">
                      <Image
                        src={sprites.other["official-artwork"].front_default}
                        alt={name}
                        width={200}
                        height={200}
                      />
                    </div>
                  </motion.li>
                </Link>
              </FadeIntoView>
            );
          })}
        </motion.ul>
        <p ref={ref}>Loading...</p>
      </section>
    </motion.main>
  );
}

const defaultEndpoint = "https://pokeapi.co/api/v2/pokemon/?limit=20";

export async function getStaticProps() {
  const pokemonBaseResponse = await fetch(defaultEndpoint);
  const pokemonBaseData = await pokemonBaseResponse.json();
  const { next, results } = pokemonBaseData;
  const pokemons = await Promise.all(
    results.map(async result => {
      const pokemonResponse = await fetch(result.url);
      return await pokemonResponse.json();
    })
  );

  return {
    props: { pokemons, next }
  };
}
