import { PageHero, Button } from "@/components/ui";
export default function NotFound() {
  return (
    <PageHero
      eyebrow="404 / PAGE NOT FOUND"
      title={
        <>
          Let’s find your
          <br />
          <em>way back.</em>
        </>
      }
      text="This page may have moved. Explore our protection solutions or return to the homepage."
    >
      <div className="button-row">
        <Button href="/">Back to home</Button>
        <Button href="/solutions/" variant="outline">
          Explore solutions
        </Button>
      </div>
    </PageHero>
  );
}
