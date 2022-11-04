import { Link } from 'react-router-dom';

export function Menu() {
  return <ol></ol>;
}

type LessonLinkProps = { n: number; emoji: string; children: React.ReactNode };
function LessonLink(props: LessonLinkProps) {
  const lessonNum = `0${props.n}`.slice(-2);
  return (
    <li>
      <Link to={`/${lessonNum}`}>
        {props.children} {props.emoji}{' '}
      </Link>
    </li>
  );
}
