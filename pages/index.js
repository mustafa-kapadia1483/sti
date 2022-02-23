import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import AmountBadges from "../components/ui/AmountBadges";
import BrandList from "../components/ui/BrandList";
import H2 from "../components/ui/H2";
import Hero from "../components/ui/Hero";
import getJsonArrayFromData from "../helpers/getJsonArrayFromData";
import googleSheetsAuth from "../helpers/googleSheetsAuth";
import numFormatter from "../helpers/numberFormatter";
import queryGoogleSheet from "../helpers/queryGoogleSheet";

export default function Home({
  investments,
  brands,
  moneyGivenForEquity,
  moneyGivenAsDebt,
  totalPitches,
}) {
  return (
    <>
      <Head>
        <title>Shark Tank India Stats</title>
      </Head>
      <Hero
        moneyOnEquity={numFormatter(moneyGivenForEquity)}
        moneyAsDebt={numFormatter(moneyGivenAsDebt)}
        totalBrands={totalPitches}
      />
      <Flex
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        gap="10"
        marginTop="5"
      >
        <AmountBadges
          amount={numFormatter(moneyGivenForEquity, true) + "+"}
          title="Spent On Equity"
        />
        <AmountBadges
          amount={numFormatter(moneyGivenAsDebt, true) + "+"}
          title="Spent As Debt"
        />
        <AmountBadges amount={totalPitches} title="Brands" />
      </Flex>
      <Flex
        marginTop="10"
        maxWidth="full"
        justifyContent={["none", "center"]}
        position="relative"
      >
        <Image
          src="/sharktankindia-banner.png"
          width="694"
          height="440"
          alt="Banner Image"
          objectFit="fill"
        />
      </Flex>
      <Box mt="16">
        <H2 color="yellow.300">Brands</H2>
        <Box mt="5" id="brands">
          <BrandList investments={investments} brands={brands} />
        </Box>
      </Box>
    </>
  );
}

export async function getStaticProps() {
  const sheets = await googleSheetsAuth();

  const investmentsResponse = await queryGoogleSheet(
    sheets,
    "investments_cleaned!A1:L95"
  );
  const investmentsData = investmentsResponse.data.values;
  const investments = getJsonArrayFromData(investmentsData);

  const brandsResponse = await queryGoogleSheet(sheets, "brands!A1:C118");
  const brandsData = brandsResponse.data.values;
  const brands = getJsonArrayFromData(brandsData);

  const totalPitches = brands.length;

  let moneyGivenForEquity = 0;
  let moneyGivenAsDebt = 0;

  investments.forEach(investment => {
    moneyGivenForEquity += parseInt(investment.invested_amount);
    moneyGivenAsDebt += parseInt(investment.debt);
  });

  return {
    props: {
      investments,
      brands,
      moneyGivenForEquity,
      moneyGivenAsDebt,
      totalPitches,
    },
  };
}
