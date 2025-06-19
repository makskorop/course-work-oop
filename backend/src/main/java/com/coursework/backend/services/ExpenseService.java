package com.coursework.backend.services;

import com.coursework.backend.models.Expense;
import com.coursework.backend.repositories.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public List<Expense> getAllByUserId(String userId) {
        System.out.println(expenseRepository.findAllByUserIdOrderByDateDesc(userId));
        return expenseRepository.findAllByUserIdOrderByDateDesc(userId);
    }

    public Optional<Expense> getById(String id) {
        return expenseRepository.findById(id);
    }

    public List<Expense> getByTimePeriod(String userId, String period) {
        Date startDate;
        LocalDate today = LocalDate.now();

        switch (period.toLowerCase()) {
            case "year":
                startDate = Date.from(today.withDayOfYear(1).atStartOfDay(ZoneOffset.UTC).toInstant());
                break;
            case "month":
                startDate = Date.from(today.withDayOfMonth(1).atStartOfDay(ZoneOffset.UTC).toInstant());
                break;
            case "day":
                startDate = Date.from(today.atStartOfDay(ZoneOffset.UTC).toInstant());
                break;
            default:
                throw new IllegalArgumentException("Invalid time period");
        }

        return expenseRepository.findAllByUserIdAndDateAfterOrderByDateDesc(userId, startDate);
    }

    public Expense create(Expense expense) {
        return expenseRepository.save(expense);
    }

    public Expense update(String id, Expense updates) {
        return expenseRepository.findById(id).map(expense -> {
            if (updates.getAmount() != null) {
                expense.setAmount(updates.getAmount());
            }
            if (updates.getCategory() != null) {
                expense.setCategory(updates.getCategory());
            }
            if (updates.getDate() != null) {
                expense.setDate(updates.getDate());
            }
            if (updates.getTitle() != null) {
                expense.setTitle(updates.getTitle());
            }
            return expenseRepository.save(expense);
        }).orElseThrow(() -> new RuntimeException("Expense not found"));
    }


    public void delete(String id) {
        expenseRepository.deleteById(id);
    }
}
