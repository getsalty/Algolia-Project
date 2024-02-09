import { Container } from '~/components/404/Container';
import { Link } from '~/components/404/Link';

export default function Custom404() {
  return (
    <Container title="404: Page Not Found">
      <div className="mb-2">This page could not be found.</div>
      <Link href="/">Go home.</Link>
    </Container>
  );
}
