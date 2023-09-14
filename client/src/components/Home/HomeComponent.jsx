import React, { Fragment, useState } from 'react'
import HomeCard from './HomeCard'
import HomePieChart from './HomePieChart'
import HomeCourse from './HomeCourse'
import { useSelector } from 'react-redux'

const HomeComponent = () => {
    const {allCourses} = useSelector(state => state.course);

    const [specificCourse, setSpecificData] = useState("");

    const setHomePageData = (specificCourse === "" ? allCourses : [allCourses.find(course => course.id === specificCourse)])

    const totalModuleListCount = setHomePageData?.reduce((total, obj) => total + obj.moduleList.length, 0);

    const TotalDuration = setHomePageData?.reduce((total, course) => {
        return total + course.moduleList?.reduce((moduleTotal, module) => {
          return moduleTotal + module.sessionList?.reduce((sessionTotal, session) => {
            return sessionTotal + session.activityList?.reduce((activityTotal, activity) => {
              return activityTotal + activity.duration;
            }, 0);
          }, 0);
        }, 0);
    }, 0);

    const SessionOptionCounts = setHomePageData?.reduce((courseCounts, course) => {
        course.moduleList?.forEach(module => {
          module.sessionList?.forEach(session => {
            courseCounts[session?.sessionOption]++;
          });
        });
        return courseCounts;
    }, { F2F: 0, Online: 0, Hybrid: 0 });

    const InteractionTypeCounts = setHomePageData?.reduce((courseCounts, course) => {
        course.moduleList?.forEach(module => {
          module.sessionList?.forEach(session => {
            courseCounts[session?.interactionType]++;
          });
        });
        return courseCounts;
    }, { Synchronous: 0, Asynchronous: 0 });

    function calculatePercentage(counts) {
      const total = Object.values(counts).reduce((acc, val) => acc + val, 0);
    
      // Convert counts to percentages
      const percentages = {};
      for (const key in counts) {
        percentages[key] = ((counts[key] / total) * 100).toFixed(2);
      }
    
      return percentages;
    }

    const SessionOptionPercentages = calculatePercentage(SessionOptionCounts);
    const InteractionTypePercentages = calculatePercentage(InteractionTypeCounts);

    console.log(SessionOptionPercentages)
    const SessionOptionData = [
        {
          id: "F2F",
          label: "F2F",
          value: 0,
          color: "hsl(252, 70%, 50%)",
        },
        {
          id: "Online",
          label: "Online",
          value: 0,
          color: "hsl(266, 70%, 50%)",
        },
        {
          id: "Hybrid",
          label: "Hybrid",
          value: 0,
          color: "hsl(81, 70%, 50%)",
        },
    ];
    
    SessionOptionData.forEach(option => {
        option.value = SessionOptionPercentages[option.id];
    });

    const InteractionTypeData = [
        {
          id: "Synchronous",
          label: "Synchronous",
          value: 0,
          color: "hsl(252, 70%, 50%)",
        },
        {
          id: "Asynchronous",
          label: "Asynchronous",
          value: 0,
          color: "hsl(266, 70%, 50%)",
        },
    ];

    InteractionTypeData.forEach(option => {
        option.value = InteractionTypePercentages[option.id];
    });


    const getSpecificCourseData = (id) => {
      setSpecificData(id)
    }


    return (
        <div className="home">
            <div className="home-1">
                <div className="home-heading">
                    <h3>Welcome to Planner Course!</h3>
                    <p>Track, manage and share your courses</p>
                </div>
                <div className="d-flex cards justify-content-between">
                    <HomeCard title="Total course" number={allCourses?.length} name="Courses" />
                    <HomeCard title="Number of module(s)" number={totalModuleListCount} name="Modules" />
                    <HomeCard title="Total time" number={TotalDuration} name="Minutes" />
                </div>
            </div>
            <div className="d-flex home-2">
                <div className="pie-detail">
                    <HomePieChart data={SessionOptionData} />
                </div>
                <div className="pie-detail">
                    <HomePieChart data={InteractionTypeData} />
                </div>
                <div className="list-courses">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="home-course-allCourse my-0">All Courses</h5>
                    <span className='text-primary text-underline'
                    onClick={() => setSpecificData("")} style={{cursor: "pointer"}}> 
                      All 
                    </span>
                  </div>
                    
                    <div className="" style={{height: "315px", overflowY:"auto"}}>
                      {
                        allCourses?.length > 0 && allCourses?.map((course) => (
                          <Fragment key={course.id}>
                            <HomeCourse title={course.courseName} id={course.id} compFunction={getSpecificCourseData}/>
                          </Fragment>
                        ))
                      }
                      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeComponent