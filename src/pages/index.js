import { motion } from "framer-motion";
import fetch from "isomorphic-fetch";
import Link from "next/link";

let easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing }
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing
    }
  }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Index = ({ starters }) => {
  return (
    <motion.main initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <motion.div variants={stagger}>
        {starters.map(starter => {
          const { name, id, sprites } = starter;
          return (
            <Link href={`/pokemon/${name}`} key={id}>
              <motion.div variants={fadeInUp}>
                <img
                  className="w-40"
                  src={sprites.other["official-artwork"].front_default}
                  alt={name}
                />
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </motion.main>
  );
};

export async function getStaticProps() {
  const [bulbasaurResponse, charmanderResponse, squirtleResponse] =
    await Promise.all([
      fetch("https://pokeapi.co/api/v2/pokemon/1"),
      fetch("https://pokeapi.co/api/v2/pokemon/4"),
      fetch("https://pokeapi.co/api/v2/pokemon/7")
    ]);

  const bulbasaur = await bulbasaurResponse.json();
  const charmander = await charmanderResponse.json();
  const squirtle = await squirtleResponse.json();

  const starters = [bulbasaur, charmander, squirtle];

  return {
    props: { starters }
  };
}

export default Index;
