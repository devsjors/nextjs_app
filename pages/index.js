const Home = ({ starters }) => {
  console.log(starters);
  return (
    <div>
      <p>Home</p>

      {starters.map(starter => {
        const { name, id } = starter;
        return (
          <div key={id}>
            <p>{name}</p>
          </div>
        );
      })}
    </div>
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

export default Home;
