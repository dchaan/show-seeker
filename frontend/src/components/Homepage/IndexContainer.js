import styles from "./IndexContainer.module.css"

const IndexContainer = ({ items }) => {
  const entries = Object.values(items)

  return (
    <div>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>
            {entry.id} - {entry.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexContainer