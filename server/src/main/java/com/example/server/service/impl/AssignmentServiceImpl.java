package com.example.server.service.impl;

import com.example.server.api.request.AssignmentRequest;
import com.example.server.exception.ObjectNotFoundException;
import com.example.server.model.Assignment;
import com.example.server.model.Course;
import com.example.server.repository.AssignmentRepository;
import com.example.server.service.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssignmentServiceImpl implements AssignmentService {
    private final AssignmentRepository assignmentRepository;

    @Override
    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    @Override
    public Optional<Assignment> getAssignmentById(UUID id) {
        return assignmentRepository.findById(id);
    }

    @Override
    public Assignment createAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    @Override
    public void deleteAssignment(UUID id) {
        assignmentRepository.deleteById(id);
    }

    @Override
    public void updateAssignmentByAssignmentNumber(List<AssignmentRequest> assignmentRequestList,List<Assignment> oldAsignmentList, int assignmentNo) {
        List<AssignmentRequest> filteredAssignments = assignmentRequestList.stream()
                .filter(e->e.getAssignmentNo()==assignmentNo)
                .collect(Collectors.toList());
        List<Assignment> filteredOldAssignments = oldAsignmentList.stream()
                .filter(e->e.getAssignmentNo()==assignmentNo)
                .collect(Collectors.toList());
        if(filteredAssignments.size()==0) return;
        AssignmentRequest _assignmentRequest = filteredAssignments.get(0);
        Assignment assignment = filteredOldAssignments.get(0);
        assignment.setAssignmentName(_assignmentRequest.getAssignmentName());
        assignment.setStartDate(_assignmentRequest.getStartDate());
        assignment.setEndDate(_assignmentRequest.getEndDate());
        assignmentRepository.save(assignment);
//        System.out.println("Successfully update the assignment!");
    }
}
