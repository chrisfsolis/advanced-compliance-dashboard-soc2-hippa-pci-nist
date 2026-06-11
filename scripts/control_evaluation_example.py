#!/usr/bin/env python3
"""Synthetic control evaluation example.

The output is an advisory readiness signal for demo controls only. It is not a
compliance determination and does not validate operating effectiveness.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class DemoControl:
    control_id: str
    required_evidence: tuple[str, ...]


def evaluate_control(control: DemoControl, available_evidence: set[str]) -> str:
    """Return a deterministic advisory readiness signal."""
    missing = set(control.required_evidence) - available_evidence
    if not missing:
        return "ready"
    if len(missing) < len(control.required_evidence):
        return "needs_review"
    return "gap"


def main() -> None:
    control = DemoControl(
        control_id="DEMO-ACCESS-001",
        required_evidence=(
            "access_review_export_placeholder",
            "reviewer_signoff_placeholder",
            "exception_list_placeholder",
        ),
    )
    signal = evaluate_control(
        control,
        {
            "access_review_export_placeholder",
            "reviewer_signoff_placeholder",
        },
    )
    print(f"{control.control_id}: {signal}")


if __name__ == "__main__":
    main()
