import {BsFire, BsBatteryCharging, BsCheckCircle, BsPeople, BsFillLightningFill} from 'react-icons/bs'
import { AiFillQuestionCircle } from 'react-icons/ai'
import {BiBookBookmark, BiExit} from 'react-icons/bi'
import {FaEye} from 'react-icons/fa'
import {GoCommentDiscussion} from 'react-icons/go'
import {PiNumberCircleThreeDuotone} from 'react-icons/pi'
import { TfiAlarmClock } from 'react-icons/tfi'
import { GiGiftOfKnowledge } from 'react-icons/gi'
import {IoTimerOutline} from 'react-icons/io5'

import FishBowlImg from '../../../images/Icon/fishbowl.png' 
import ThinkPairShareImg from '../../../images/Icon/think_pair_share.png' 
import FourCornersImg from '../../../images/Icon/four_corners.png' 
import DebateImg from '../../../images/Icon/debate.png' 
import BreakoutGroupsImg from '../../../images/Icon/breakout_groups.png' 
import GroupWorkImg from '../../../images/Icon/group_work.png'
import ReadWatchListenImg from '../../../images/Icon/read_watch_listen.png'



// import {MdOutlineAddBox} from 'react-icons/md'
export const ActivityCardList = [
    // Activity 01
    {
        activityID:'warm_up',
        activityName: 'Warm Up',
        activityDescription: 'Engage the class with a short energy boosting activity or introduce a concept.',
        activityIcon: <BsFire/>,
        activityIconBg: '#E64A19',
        activityUsedFor: '',
    },
    // Activity 02
    {
        activityID:'read_watch_listen',
        activityName: 'Read, Watch, Listen',
        activityDescription: 'Share video, give a presentation, review images, or read text.',
        activityIcon: <FaEye/>,
        activityIconBg: '#C2185B',
        activityUsedFor: '',
    },
    // Activity 03
    {
        activityID:'reflect',
        activityName: 'Reflect',
        activityDescription: 'Give prompts for learners to become aware of their own thinking process.',
        activityIcon: <BiBookBookmark/>,
        activityIconBg: '#7B1FA2',
        activityUsedFor: '',
    },
    // Activity 04
    {
        activityID:'discuss',
        activityName: 'Discuss',
        activityDescription: 'Spark conversations with breakout groups, debate, pairs, etc.',
        activityIcon: <GoCommentDiscussion/>,
        activityIconBg: '#0288D1',
        activityUsedFor: '',
    },
    // Activity 05
    {
        activityID:'collaborate',
        activityName: 'Collaborate',
        activityDescription: 'Offer opportunities for learners to work together on projects.',
        activityIcon: <BsPeople/>,
        activityIconBg: '#0097A7',
        activityUsedFor: '',
    },
    // Activity 06
    {
        activityID:'access',
        activityName: 'Access',
        activityDescription: 'Create and distribute knowledge checks, quizzes, and polls.',
        activityIcon: <BsCheckCircle/>,
        activityIconBg: '#388E3C',
        activityUsedFor: '',
    },
    // Activity 07
    {
        activityID:'break',
        activityName: 'Break',
        activityDescription: 'Take a moment to pause and recharge.',
        activityIcon: <BsBatteryCharging/>,
        activityIconBg: 'rgb(91 122 137)',
        activityUsedFor: '',
    },
]

export const ActivityTypeMap = [
    {
        activityID: 'warm_up',
        activityType: [
            {
                activityTypeID: 'do_now',
                activityTypeName: 'Do Now',
                activityTypeDesc: "Give learners a quick task or exercise to work on independently or collaboratively with minimal guidance. A 'Do Now' can be used to activate students learning for the lesson, surface prior knowledge, and familiarize students with lesson vocabulary.",
                activityTypeIcon: <TfiAlarmClock/>,
                activityTypeFill: 'option',
                activityTypeOption: [
                    {
                        optionID: 'independently',
                        optionName: 'Independently',
                    },
                    {
                        optionID: 'collaboratively',
                        optionName: 'Collaboratively',
                    }
                ]
            },
            {
                activityTypeID: 'question',
                activityTypeName: 'Question',
                activityTypeDesc: "Ask learners a question and have them share their responses to the whole class.",
                activityTypeIcon: <AiFillQuestionCircle/>,
                activityTypeFill: 'option',
                activityTypeOption: [
                    {
                        optionID: 'whiparound',
                        optionName: 'Whiparound',
                    },
                    {
                        optionID: 'word_cloud',
                        optionName: 'Word Cloud',
                    },
                    {
                        optionID: 'cold_call',
                        optionName: 'Cold Call',
                    },
                    {
                        optionID: 'volunteers',
                        optionName: 'Volunteers',
                    }
                ]
            }

        ]
    },

    {
        activityID: 'read_watch_listen',
        activityType: [
            {
                activityTypeID: 'read_watch_listen',
                activityTypeName: 'Read, Watch, Listen',
                activityTypeDesc: "'Read, Watch, Listen' is an approach that encourages individuals to engage with information or entertainment through reading, watching, and listening. It promotes a diverse and comprehensive way of consuming content across written, visual, and audio-based mediums.",
                activityTypeIcon: <img src={ReadWatchListenImg} alt="" style={{width: "235px"}}/>,
                activityTypeFill: 'form',
                activityTypeForm: 'textarea'
            },
        ]
    },

    {
        activityID: 'reflect',
        activityType: [
            {
                activityTypeID: '3-2-1',
                activityTypeName: '3-2-1',
                activityTypeDesc: "When this routine is initiated, students will receive a prompt to write down a reflection on. You can create a template for them to fill out for their reflection.",
                activityTypeIcon: <PiNumberCircleThreeDuotone/>,
                activityTypeFill: 'form',
                activityTypeForm: 'input',
                activityFormList: [
                    {
                        formID: 'input-1',
                        formName: '3 Prompt',
                        formDesc: 'What are three things you learned?'

                    },
                    {
                        formID: 'input-2',
                        formName: '2 Prompt',
                        formDesc: 'What are two things you found interesting?'

                    },
                    {
                        formID: 'input-3',
                        formName: '1 Prompt',
                        formDesc: 'What is one question you have'

                    },
                ]
            },
            {
                activityTypeID: 's.i.t',
                activityTypeName: 'Surprising, Interesting, Troubling (S.I.T)',
                activityTypeDesc: "When this routine is initiated, students will receive a prompt to write down a reflection on about what they suprised, interested, or troubled them in the class. You can create a template for them to fill out for their reflection.",
                activityTypeIcon: <BsFillLightningFill/>,
                activityTypeFill: 'form',
                activityTypeForm: 'input',
                activityFormList: [
                    {
                        formID: 'input-1',
                        formName: 'Surprising',
                        formDesc: 'What is one thing you found surprising?'

                    },
                    {
                        formID: 'input-2',
                        formName: 'Interesting',
                        formDesc: 'What did you find interesting?'

                    },
                    {
                        formID: 'input-3',
                        formName: 'Troubling',
                        formDesc: 'What did you find troubling?'

                    },
                ]
            }

        ]
    },

    {
        activityID: 'discuss',
        activityType: [
            {
                activityTypeID: 'fishbowl',
                activityTypeName: 'Fishbowl',
                activityTypeDesc: "A large group dialogue by focusing on a small group discussion in an inner circle while the rest of the group listens and observes from the outer circle.",
                activityTypeIcon: <img src={FishBowlImg} alt="" />,
                activityTypeFill: '',
            },
            {
                activityTypeID: 'think_pair_share',
                activityTypeName: 'Think, Pair, Share',
                activityTypeDesc: "A three part activity where learners first fill out a written prompt about their thoughts on a question you choose. This is followed by them sharing their thoughts with their partner and filling out another prompt during that sharing session. Finally, learners will fill out a third written prompt while listening to pairs share their responses.",
                activityTypeIcon: <img src={ThinkPairShareImg} alt="" style={{width: "185px"}}/>,
                activityTypeFill: '',
            },
            {
                activityTypeID: 'four_corners',
                activityTypeName: 'Four Corners',
                activityTypeDesc: "A Four Corners discussion requires learners to show their position on a specific statement (strongly agree, agree, disagree, strongly disagree) by finding a position in a particular corner of the physical or digital space and sharing their stance.",
                activityTypeIcon: <img src={FourCornersImg} alt="" />,
                activityTypeFill: '',
            },
            {
                activityTypeID: 'debate',
                activityTypeName: 'Debate',
                activityTypeDesc: "Learners are placed into groups of three and assigned a topic to debate. One person is in support of the topic, one is against, and one acts as the judge. The judge, or “decision maker,” will create a list of questions to ask the advocates, which learners will use as their debate outline. Then the judge will decide at the end of the debate who the winner is. This can be done in front of the class or in groups.",
                activityTypeIcon: <img src={DebateImg} alt="" />,
                activityTypeFill: '',
            },
            {
                activityTypeID: 'breakout_groups',
                activityTypeName: 'Breakout Groups',
                activityTypeDesc: "Assign the larger group to work in smaller teams to discuss a topic, answer a question, or tackle a specific challenge. Designate roles for each learner within a group such as a facilitator, notetaker, and etc. Breakout groups are designed to increase participation.",
                activityTypeIcon: <img src={BreakoutGroupsImg} alt="" />,
                activityTypeFill: '',
            },

        ]
    },

    {
        activityID: 'collaborate',
        activityType: [
            {
                activityTypeID: 'group_work',
                activityTypeName: 'Group Work',
                activityTypeDesc: "Groupwork allows learners to collaboratively prepare review materials, brainstorm ideas, and work on assignments for class in groups.",
                activityTypeIcon: <img src={GroupWorkImg} alt="" />,
                activityTypeFill: '',
            },
        
        ]
    },
    {
        activityID: 'access',
        activityType: [
            {
                activityTypeID: 'knowledge_check',
                activityTypeName: 'Knowledge Check',
                activityTypeDesc: "Knowledge checks are quizzes that are meant to give the learner an idea of how well they know the material, are way for learners to review their learning progress and see where any gaps exist.",
                activityTypeIcon: <GiGiftOfKnowledge/>,
                activityTypeFill: '',
            },
            {
                activityTypeID: 'exit_ticket',
                activityTypeName: 'Exit Ticket',
                activityTypeDesc: "Exit tickets are a formative assessment tool that give educators a way to assess how well learners understand the material they are learning in class. Exit tickets are usually given at the end of the class session.",
                activityTypeIcon: <BiExit/>,
                activityTypeFill: '',
            },
        
        ]
    },
    {
        activityID: 'break',
        activityType: [
            {
                activityTypeID: 'break',
                activityTypeName: 'Break',
                activityTypeDesc: "Have learners take a moment to pause and take a break.",
                activityTypeIcon: <IoTimerOutline/>,
                activityTypeFill: '',
            },
        
        ]
    }


]