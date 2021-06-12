import { motion } from "framer-motion";
import fetch from "isomorphic-fetch";
import Image from "next/image";

const Pokemon = ({ pokemon }) => {
  const { base, species } = pokemon;
  const { id, name, sprites, types } = base;
  const { flavor_text_entries } = species;
  const mainType = types[0].type.name;
  const description = flavor_text_entries.find(
    text => text.language.name === "en"
  ).flavor_text;

  return (
    <motion.main
      className={`flex flex-col lg:flex-row bg-opacity-10 bg-types-${mainType}`}
      initial="initial"
      animate="animate"
      exit={{ opacity: 0 }}
    >
      <section
        className={`relative flex items-center justify-center w-full lg:w-1/2 py-24 lg:py-48 bg-opacity-40 bg-types-${mainType}`}
      >
        <div className="relative">
          <motion.div
            className={`absolute bottom-0 h-12 sm:h-20 w-48 sm:w-72 bg-opacity-50 rounded-100 bg-types-${mainType}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          />
          <motion.div
            className="w-48 sm:w-72"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Image
              src={sprites.other["official-artwork"].front_default}
              alt={name}
              width={288}
              height={288}
            />
          </motion.div>
        </div>
        <motion.p
          className={`absolute text-4xl md:text-6xl font-extrabold mix-blend-multiply text-types-${mainType} tracking-wider font-body bottom-2 right-3 sm:bottom-4 sm:right-6`}
          initial={{ x: -12, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          #{id}
        </motion.p>
      </section>
      <section className="flex items-center w-full lg:w-1/2">
        <div className="w-full max-w-md py-8 mx-4 lg:py-0 md:mx-auto">
          <h3
            className={`font-display capitalize text-3xl mb-2 text-types-${mainType}`}
          >
            {name}
          </h3>
          <p className="mb-2 font-body">{description}</p>
          <ul className="flex space-x-2">
            {types.map(type => {
              // eslint-disable-next-line prettier/prettier
              const { slot, type: { name } } = type;
              return (
                <li
                  className={`capitalize font-body bg-types-${name} px-4 py-1 rounded-full`}
                  key={slot}
                >
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </motion.main>
  );
};

export async function getServerSideProps({ query }) {
  const { name } = query;
  const [baseResponse, speciesResponse] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
  ]);

  const base = await baseResponse.json();
  const species = await speciesResponse.json();

  return {
    props: { pokemon: { base, species } }
  };
}

export default Pokemon;
