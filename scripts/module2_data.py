import json
import os
import sys

sys.path.append(os.path.dirname(__file__))
from slide_builder import make_rich_slide

# Import from build_full_module1_and_2
from build_full_module1_and_2 import (
    m02_l1_slides, m02_l1_written,
    m02_l2_slides, m02_l2_written,
    m02_l3_slides, m02_l3_written,
    m02_l4_slides, m02_l4_written,
    MODULE_02
)

print("module2_data loaded with", len(MODULE_02), "lessons.")
