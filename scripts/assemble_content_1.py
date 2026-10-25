import json
import os
import sys

sys.path.append(os.path.dirname(__file__))

import generate_content_1_v2 as m1_base
import build_full_module1_and_2 as m2_base

# MODULE 01 LESSONS
m01_l1_slides = m1_base.m01_l1_slides
m01_l1_written = m1_base.m01_l1_written
m01_l2_slides = m1_base.m01_l2_slides
m01_l2_written = m1_base.m01_l2_written

# Check if m01_l3 is in build_full_module1_and_2
m01_l3_slides = getattr(m2_base, 'm01_l3_slides', None)
m01_l3_written = getattr(m2_base, 'm01_l3_written', None)
m01_l4_slides = getattr(m2_base, 'm01_l4_slides', None)
m01_l4_written = getattr(m2_base, 'm01_l4_written', None)

m02_l1_slides = m2_base.m02_l1_slides
m02_l1_written = m2_base.m02_l1_written
m02_l2_slides = m2_base.m02_l2_slides
m02_l2_written = m2_base.m02_l2_written
m02_l3_slides = m2_base.m02_l3_slides
m02_l3_written = m2_base.m02_l3_written
m02_l4_slides = m2_base.m02_l4_slides
m02_l4_written = m2_base.m02_l4_written

print("m01_l1:", bool(m01_l1_slides), "m01_l2:", bool(m01_l2_slides))
print("m01_l3:", bool(m01_l3_slides), "m01_l4:", bool(m01_l4_slides))
print("m02_l1:", bool(m02_l1_slides), "m02_l2:", bool(m02_l2_slides))
print("m02_l3:", bool(m02_l3_slides), "m02_l4:", bool(m02_l4_slides))
