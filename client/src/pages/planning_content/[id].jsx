import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataFromLinkSharing,
  getIdFromLinkSharing,
} from "../../redux/slices/sharingSlice";
import { useParams } from "react-router-dom";
import PlanningContentComponent from "../../components/PlanningContent/PlanningContentComponent";
import { getComment } from "../../redux/slices/commentSlice";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { BACKEND_PROXY } from "../../proxy";

const PlanningContentPage = () => {
  const { id } = useParams();
  const { accessToken } = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataFromLinkSharing({ sharedID: id, token: accessToken }));
  }, [accessToken, dispatch, id]);

  useEffect(() => {
    dispatch(getIdFromLinkSharing({ sharedID: id, token: accessToken }));
  }, [accessToken, dispatch, id]);

  useEffect(() => {
    dispatch(getComment({ sharingID: id, token: accessToken }));
  }, [accessToken, dispatch, id]);

  // const fetchComments = (accessToken, dispatch, id) => {
  //   dispatch(getComment({ sharingID: id, token: accessToken }));
  // };

  useEffect(() => {
    const socket = new SockJS(`${BACKEND_PROXY}/ws`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
    });
    stompClient.activate();

    stompClient.onConnect = () => {
      stompClient.subscribe("/topic/comments", (frame) => {
        dispatch(getComment({ sharingID: id, token: accessToken }));
      });
    };

    stompClient.onError = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      stompClient.deactivate();
    };
  }, [accessToken, dispatch, id]);

  return <PlanningContentComponent />;
};

export default PlanningContentPage;
