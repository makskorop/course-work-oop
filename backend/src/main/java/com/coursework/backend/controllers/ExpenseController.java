package com.coursework.backend.controllers;

import java.util.List;
import com.coursework.backend.models.Expense;
import com.coursework.backend.services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @GetMapping("/{userId}")
    public List<Expense> getAll(@PathVariable String userId) {
        return expenseService.getAllByUserId(userId);
    }

    @GetMapping("/{userId}/period")
    public List<Expense> getByPeriod(@PathVariable String userId, @RequestParam String period) {
        return expenseService.getByTimePeriod(userId, period);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<Expense> getById(@PathVariable String id) {
        return expenseService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/")
    public Expense create(@RequestBody Expense expense) {
        return expenseService.create(expense);
    }

    @PutMapping("/{id}")
    public Expense update(@PathVariable String id, @RequestBody Expense updates) {
        return expenseService.update(id, updates);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        expenseService.delete(id);
    }
}
