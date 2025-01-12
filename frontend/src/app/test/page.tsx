"use client";
import { Button } from "@/components/client";
import { Text } from "@/components/server";
const TestPage: React.FC = () => {
  return (
    <div>
      <Text variant="h1">Test Page</Text>
      <Text variant="h2">Test Page</Text>
      <Text variant="h3">Test Page</Text>
      <Text variant="h4">Test Page</Text>
      <Text variant="h5">Test Page</Text>
      <Text variant="subtitle-15">Test Page</Text>
      <Text variant="body-15">Test Page</Text>
      <Text variant="subtitle-16">Test Page</Text>
      <Text variant="body-16">Test Page</Text>
      <Text variant="button">Test Page</Text>
      <Text variant="caption">Test Page</Text>
      <div className="flex flex-row gap-2 ">
        <Button>Test Button</Button>
        <Button leftIcon="ArrowLeftIcon">Test Button</Button>
        <Button iconOnly leftIcon="ArrowLeftIcon" />
        <Button color="secondary">Test Button</Button>
        <Button color="secondary" leftIcon="ArrowLeftIcon">
          Test Button
        </Button>
        <Button color="secondary" iconOnly leftIcon="ArrowLeftIcon" />
      </div>
    </div>
  );
};
export default TestPage;
