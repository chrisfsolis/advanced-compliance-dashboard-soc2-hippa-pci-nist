#!/usr/bin/env python3
"""Synthetic local evidence collector example.

This script demonstrates how local demo evidence metadata can be shaped for
readiness workflows. It does not call external APIs and does not collect real
customer, account, or production system data.
"""

from __future__ import annotations

import json
from dataclasses import asdict, dataclass


@dataclass(frozen=True)
class SyntheticEvidenceRecord:
    framework_id: str
    control_id: str
    evidence_label: str
    owner: str
    status: str


def collect_synthetic_evidence() -> list[SyntheticEvidenceRecord]:
    """Return deterministic synthetic evidence metadata records."""
    return [
        SyntheticEvidenceRecord(
            framework_id="sox-itgc",
            control_id="SOX-ITGC-001",
            evidence_label="access_review_export_placeholder",
            owner="Demo System Owner",
            status="ready",
        ),
        SyntheticEvidenceRecord(
            framework_id="soc2",
            control_id="SOC2-DEMO-ACCESS-001",
            evidence_label="reviewer_signoff_placeholder",
            owner="Demo Trust Services Owner",
            status="needs_review",
        ),
    ]


def main() -> None:
    records = [asdict(record) for record in collect_synthetic_evidence()]
    print(json.dumps({"records": records}, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
