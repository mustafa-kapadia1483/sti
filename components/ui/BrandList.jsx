import { Flex } from "@chakra-ui/react";
import BrandCard from "./BrandCard";

const BrandList = ({ investments, brands }) => {
  return (
    <Flex
      as="ul"
      flexWrap="wrap"
      justifyContent="space-between"
      alignItems="center"
    >
      {investments.map((investment) => (
        <BrandCard
          key={investment.brand_id}
          investment={investment}
          brand={brands[investment.brand_id - 1]}
          // dealDone={investment.deal_done}
          // brand={brands[investment.brand_id - 1]}
        />
      ))}
    </Flex>
  );
};

export default BrandList;
