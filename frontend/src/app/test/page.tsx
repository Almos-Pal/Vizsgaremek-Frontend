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
      <Button>Test Button</Button>
    </div>
  );
};
export default TestPage;
