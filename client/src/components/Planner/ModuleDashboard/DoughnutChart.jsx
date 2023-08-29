import React, { useEffect, useState } from 'react'

import {ResponsivePie} from '@nivo/pie'

import { ActivityCardList } from '../Activity/Map/ActivityCardList';


const DoughnutChart = ({dataset, durationTime}) => {
    let formattedData = dataset.length > 0 ? Object.values(    
        dataset.reduce((acc, item) => {
            // Find matching activity in ActivityCardList based on activityID
            const matchingActivity = ActivityCardList.find(activity => activity.activityID === item.activityID);

            // If the activity already exists in the accumulator, add the duration
            if (acc[item.activityID]) {
                acc[item.activityID].duration += item.duration;
            } 
            else {
            // If the activity doesn't exist in the accumulator, create a new entry
                acc[item.activityID] = {
                activityID: item.activityID,
                activityName: matchingActivity.activityName,
                activityIconBg: matchingActivity.activityIconBg,
                duration: item.duration
            };
          }
          return acc;
        }, {})
        // Formatted data into the data can use in chart
    ).map(({ activityName, duration, activityIconBg }) => ({
        id: activityName,
        label: activityName,
        value: duration,
        color: activityIconBg
    })) : [];

    const totalDuration = formattedData.reduce((total, item) => total + item.value, 0);

    const additionalItem = {
        id: 'Remaining Time',
        label: 'Remaining Time',
        value: durationTime - totalDuration,
        color: '#808080'
    };
      
    const updatedFormattedData = durationTime > 0 ? [...formattedData, additionalItem] : [...formattedData];

    const displayTime = (time) => {
        if (time >= 15) {
            const timeRemain = durationTime - totalDuration
            if (timeRemain >= 0) {
                return (
                <>
                    <h5>{timeRemain}'</h5>
                    <h5>left</h5>
                </>
                )
            } else {
                return (
                    <>
                        <h5>{Math.abs(timeRemain)}'</h5>
                        <h5>over</h5>
                    </>
                )
            }
        } 
    }
    

    // console.log(formattedData)
    // console.log(durationTime)
    const [isTabletView, setIsTabletView] = useState(window.innerWidth <= 1100);

    const handleResize = () => {
      setIsTabletView(window.innerWidth <= 1100);
    };
  
    useEffect(() => {
      // Add event listener on component mount
      window.addEventListener('resize', handleResize);
  
      // Clean up event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (    
        <div className="position-relative" style={{width:'100%' ,height: "100%"}}>
            {
                isTabletView ?
                (
                    <ResponsivePie
                        data={updatedFormattedData}
                        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                        innerRadius={0.5}
                        padAngle={1}
                        cornerRadius={3}
                        activeOuterRadiusOffset={10}
                        colors={{ datum: "data.color" }}
                        borderWidth={1}
                        borderColor={{ theme: 'background' }}
                        enableArcLinkLabels={false}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: 'color' }}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor="#fff"
                        legends={[]}
                    />
                )
                :
                (
                    <ResponsivePie
                        data={updatedFormattedData}
                        margin={{ top: 50, right: 140, bottom: 70, left: 5 }}
                        innerRadius={0.5}
                        padAngle={1}
                        cornerRadius={3}
                        activeOuterRadiusOffset={10}
                        colors={{ datum: "data.color" }}
                        borderWidth={1}
                        borderColor={{ theme: 'background' }}
                        enableArcLinkLabels={false}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: 'color' }}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor="#fff"
                        legends={
                            [
                                {
                                    anchor: 'top-right',
                                    direction: 'column',
                                    justify: false,
                                    translateX: 110,
                                    translateY: 30,
                                    itemWidth: 100,
                                    itemHeight: 30,
                                    itemsSpacing: 0,
                                    symbolSize: 20,
                                    itemDirection: 'left-to-right'
                                }
                            ]
                        }
                    />
                )
            }
            

            <div className="chart_text_center" style={{transform: isTabletView ? "translate(-50%, -60%)" : "translate(-135%, -80%)"}}>
                {displayTime(durationTime)}  
            </div>
        </div>
    );
}

export default DoughnutChart