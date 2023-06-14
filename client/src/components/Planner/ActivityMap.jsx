import {BsFire, BsBatteryCharging, BsCheckCircle, BsPeople} from 'react-icons/bs'
import {FaEye} from 'react-icons/fa'
import {BiBookBookmark} from 'react-icons/bi'
import {GoCommentDiscussion} from 'react-icons/go'

import {MdOutlineAddBox} from 'react-icons/md'
export const ActivityMap = [
    // Activity 01
    {
        activityID:'activity-01',
        activityName: 'Warm Up',
        activityDescription: 'Engage the class with a short energy boosting activity or introduce a concept.',
        activityIcon: <BsFire/>,
        activityIconBg: '#E64A19',
        activityUsedFor: '',
    },
    // Activity 02
    {
        activityID:'activity-02',
        activityName: 'Read, Watch, Listen',
        activityDescription: 'Share video, give a presentation, review images, or read text.',
        activityIcon: <FaEye/>,
        activityIconBg: '#C2185B',
        activityUsedFor: '',
    },
    // Activity 03
    {
        activityID:'activity-03',
        activityName: 'Reflect',
        activityDescription: 'Give prompts for learners to become aware of their own thinking process.',
        activityIcon: <BiBookBookmark/>,
        activityIconBg: '#7B1FA2',
        activityUsedFor: '',
    },
    // Activity 04
    {
        activityID:'activity-04',
        activityName: 'Discuss',
        activityDescription: 'Spark conversations with breakout groups, debate, pairs, etc.',
        activityIcon: <GoCommentDiscussion/>,
        activityIconBg: '#0288D1',
        activityUsedFor: '',
    },
    // Activity 05
    {
        activityID:'activity-05',
        activityName: 'Collaborate',
        activityDescription: 'Offer opportunities for learners to work together on projects.',
        activityIcon: <BsPeople/>,
        activityIconBg: '#0097A7',
        activityUsedFor: '',
    },
    // Activity 06
    {
        activityID:'activity-06',
        activityName: 'Access',
        activityDescription: 'Create and distribute knowledge checks, quizzes, and polls.',
        activityIcon: <BsCheckCircle/>,
        activityIconBg: '#388E3C',
        activityUsedFor: '',
    },
    // Activity 07
    {
        activityID:'activity-07',
        activityName: 'Break',
        activityDescription: 'Take a moment to pause and recharge.',
        activityIcon: <BsBatteryCharging/>,
        activityIconBg: '#455A64',
        activityUsedFor: '',
    },
    // Activity 08
    {
        activityID:'activity-08',
        activityName: 'Custom',
        activityDescription: 'Create a new learning activity.',
        activityIcon: <MdOutlineAddBox/>,
        activityIconBg: '#616161',
        activityUsedFor: '',
    },
]