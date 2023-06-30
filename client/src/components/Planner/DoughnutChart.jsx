import React from 'react'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import {Doughnut} from 'react-chartjs-2'
import "chartjs-plugin-doughnut-innertext"

import { ActivityCardList } from './Activity/Map/ActivityCardList';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({dataset}) => {
    const uniqueActivityIDs = [];

    const activityCounts = [];

    const activityNameList = [];
    const activityColorList = [];

    
    if(dataset.length > 0) {
        // const activityIDs = [];
        

        // Count activityID and extract into two different arrays
        dataset.forEach(item => {
            if (!uniqueActivityIDs.includes(item.activityID)) {
                uniqueActivityIDs.push(item.activityID);
            }
            const { activityID } = item;

            // Check if the activityID is already in the activityCounts array
            const existingCountIndex = activityCounts.findIndex(countItem => countItem.activityID === activityID);
            
            if (existingCountIndex !== -1) {
                // Increment the count if the activityID already exists
                activityCounts[existingCountIndex].count++;
            } else {
                // Add a new entry if the activityID doesn't exist
                activityCounts.push({ activityID, count: 1 });
            }
        });
    };

    const countsArray = activityCounts.map(countItem => countItem.count);
    
    // console.log('Unique Activity IDs:', uniqueActivityIDs);
    // console.log('Activity IDs Count:', countsArray);

    uniqueActivityIDs.forEach(activityItm => {
        const activityFilter = ActivityCardList.filter((activity) => activityItm === activity.activityID);
        activityNameList.push(activityFilter[0].activityName)
        activityColorList.push(activityFilter[0].activityIconBg);
    });

    // console.log(activityColorList)

    const chartData = {
        labels: activityNameList,
        datasets: [
            {
                data: countsArray,
                backgroundColor: activityColorList,
                hoverBackgroundColor: activityColorList,
            },
        ],
    };

    const options = {
        plugins: {
            datalabels: {
              display: true,
              backgroundColor: '#ccc',
              borderRadius: 3,
              font: {
                color: 'red',
                weight: 'bold',
              },
            },
            doughnutlabel: {
              labels: [
                {
                  text: '550',
                  font: {
                    size: 20,
                    weight: 'bold',
                  },
                },
                {
                  text: 'total',
                },
              ],
            },
        },
    }

    const textCenter = {
        id: 'textCenter',
        beforeDraw(chart) {
            const { width } = chart;
            const { height } = chart;
            const { ctx } = chart;

            ctx.restore();
            var fontSize = (height / 300).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            var text = "2.44%"
            const textX = Math.round((width - ctx.measureText(text).width) / 2);
            const textY = height / 2;
            ctx.fillText(text, textX, textY);
            ctx.save();
        },
           
    }



    return (    
        <Doughnut data={chartData} options={options} plugins={[textCenter]}/>   
    );
}

export default DoughnutChart