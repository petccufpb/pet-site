"use client";
import { Flex, Text } from "@app/styles";
import { useState } from "react";

import { Card, CardHeader, CardIndex, CardTitle } from "./styles";

type CardProps = {
  title: string;
  description: string[];
  icon: React.ReactNode;
  bottomText: string;
};

export default function Cards({ items }: { items: CardProps[] }) {
  const [highlighted, setHighlighted] = useState(2);

  return (
    <Flex relative minw="570px" h="800px" align="center">
      {items.map((item, index) => (
        <Card
          highlighted={highlighted === index}
          index={index}
          key={index}
          onMouseEnter={() => setHighlighted(index)}
          zIndex={highlighted === 0 ? 2 - index : index}
        >
          <CardHeader>
            <CardIndex>0{3 - index}</CardIndex>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <Flex h="100%" justify="space-between" vertical padding="2rem 2.5rem">
            <div>
              {item.description.map((text, i) =>
                i % 2 === 0 ? (
                  <Text inline key={i} weight="500" size="1.125rem" color="#4d4d4d">
                    {text}
                  </Text>
                ) : (
                  <Text
                    inline
                    color={highlighted === index ? "black" : "white"}
                    weight="700"
                    size="1.125rem"
                    key={i}
                    space
                  >
                    {text}
                  </Text>
                ),
              )}
            </div>
            <Flex
              mr="auto"
              rounded="1rem"
              bg={highlighted === index ? "white" : "black"}
              gap="1rem"
              padding="0.5rem 1.5rem"
              align="center"
              color={highlighted === index ? "black" : "white"}
            >
              {item.icon}
              <Text alt weight="600" color={highlighted === index ? "black" : "white"}>
                {item.bottomText}
              </Text>
            </Flex>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}
