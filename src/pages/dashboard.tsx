import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import { NextPage } from "next";
import dynamic from 'next/dynamic'

import Header from "../components/Header";
import SideBar from "../components/Sidebar";

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false
})

const options: ApexOptions = {
    chart: {
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        foreColor: theme.colors.gray[500]
    },
    grid:{
        show: false,
    },
    dataLabels: {
        enabled: false
    },
    tooltip: {
        enabled: false
    },
    xaxis:{
        type: "datetime",
        axisBorder: {
            color: theme.colors.gray[600],
        },
        axisTicks: {
            color: theme.colors.gray[600],
        },
        categories: [
            "2021-03-18T00:00:00.000Z",
            "2021-03-19T00:00:00.000Z",
            "2021-03-20T00:00:00.000Z",
            "2021-03-21T00:00:00.000Z",
            "2021-03-22T00:00:00.000Z",
            "2021-03-23T00:00:00.000Z",
            "2021-03-24T00:00:00.000Z"
        ]
    },
    fill: {
        opacity: 0.3,
        type: "gradient",
        gradient: {
            shade: "dark",
            opacityFrom: 0.7,
            opacityTo: 0.3
        }
    }
}

const series = [
    { name: "series1", data: [31, 120, 10, 28, 51, 18, 109] }
]

const series2 = [
    { name: "series2", data: [90, 27, 12, 33, 12, 120, 109] }
]

const series3 = [
    { name: "series3", data: [31, 27, 12, 33, 90, 27, 109] }
]

const series4 = [
    { name: "series4", data: [ 27, 33, 12, 120, 27, 12, 109] }
]

const Dashboard: NextPage = () => {
    return(
        <Flex
            flexDir="column"
            h="100vh"
        >
            <Header />
            <Flex
                w="100%"
                my="6"
                maxW={ 1480 }
                mx="auto"
                px="6"
            >
                <SideBar />

                <SimpleGrid
                    flex="1"
                    gap="4"
                    minChildWidth="400px"
                    alignItems="flex-start"
                    flexWrap="wrap"
                >
                    <Box
                        p={["6", "8"]}
                        bg="gray.800"
                        borderRadius={8}
                        pb="4"
                    >
                        <Text fontSize="lg" mb="4">Inscritos da semana</Text>
                        <Chart
                            type="area"
                            height={160}
                            options={options}
                            series={series}
                        />
                    </Box>
                    <Box
                        p={["6", "8"]}
                        bg="gray.800"
                        borderRadius={8}
                        pb="4"
                    >
                        <Text fontSize="lg" mb="4">Taxa de abertura</Text>
                        <Chart 
                            type="area"
                            height={160}
                            options={options}
                            series={series2}
                        />
                    </Box>
                    <Box
                        p={["6", "8"]}
                        bg="gray.800"
                        borderRadius={8}
                        pb="4"
                    >
                        <Text fontSize="lg" mb="4">Faturamento</Text>
                        <Chart
                            type="area"
                            height={160}
                            options={options}
                            series={series3}
                        />
                    </Box>
                    <Box
                        p={["6", "8"]}
                        bg="gray.800"
                        borderRadius={8}
                        pb="4"
                    >
                        <Text fontSize="lg" mb="4">Resumo</Text>
                        <Chart 
                            type="area"
                            height={160}
                            options={options}
                            series={series4}
                        />
                    </Box>
                </SimpleGrid>
            </Flex>
        </Flex>
    )
}

export default Dashboard